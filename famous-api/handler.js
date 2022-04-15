'use strict';
const dbConfig = require('./db')

const { Client } = require('pg')

const getGeoJsonSqlFor = (sql) => {
  
  //remove trailing ; if present
  if(sql.charAt(sql.length - 1) === ';') sql = sql.substr(0, sql.length - 1)
  
  return `SELECT jsonb_build_object(
            'type', 'FeatureCollection',
            'features', jsonb_agg(features.feature)
          )
          FROM 
          (
            SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(shape,3)::jsonb,
            'properties', to_jsonb(inputs) - 'shape'
          ) AS feature
          FROM 
            (
              ${sql}
            ) inputs
          ) features;`
}

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hooray! It works!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.getCountries = (event, context, callback) => {

  const client = new Client(dbConfig)
  client.connect()

  let sql = `SELECT 
    id, 
    name, 
    country_code, 
    shape
  FROM public.countries
  LIMIT 10;`.trim()

  sql = getGeoJsonSqlFor(sql)

  client
    .query(sql, null)
    .then((res) => {
      
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'GET'
        },
        body: JSON.stringify(res.rows[0]['jsonb_build_object']),
      }

      callback(null, response)

      client.end()
    })
    .catch((error) => {

      const errorResponse = {
        statusCode: error.statusCode || 500,
        body: `${error}`,
      }

      callback(null, errorResponse)

      client.end()
    })
}

module.exports.getFamous = (event, context, callback) => {

  let sql = 
  `SELECT 
    id,
    name,
    domain,
    industry,
    occupation,
    gender,
    birth_year,
    birth_place,
    bp_lat,
    bp_lon,
    country_code,
    st_setsrid(st_makepoint(bp_lon, bp_lat), 4326) as shape
  FROM famous where 1=1 `.trim()

  if(event.queryStringParameters) {
    if(event.queryStringParameters['domain']) sql += ` and domain='${event.queryStringParameters['domain']}'`
    if(event.queryStringParameters['industry']) sql += ` and industry='${event.queryStringParameters['industry']}'`
    if(event.queryStringParameters['occupation']) sql += ` and occupation='${event.queryStringParameters['occupation']}'`
    if(event.queryStringParameters['birth_year']) sql += ` and birth_year=${event.queryStringParameters['birth_year']}`
    if(event.queryStringParameters['birth_place']) sql += ` and birth_place='${event.queryStringParameters['birth_place']}'`
    if(event.queryStringParameters['name']) sql += ` and name='${event.queryStringParameters['name']}'`
  }
  
  sql = getGeoJsonSqlFor(sql)

  const client = new Client(dbConfig)
  client.connect()

  client
    .query(sql, null)
    .then((res) => {
      
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'GET'
        },
        body: JSON.stringify(res.rows[0]['jsonb_build_object']),
      }

      callback(null, response)

      client.end()
    })
    .catch((error) => {

      const errorResponse = {
        statusCode: error.statusCode || 500,
        body: `${error}`,
      }

      callback(null, errorResponse)

      client.end()
    })
}