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

module.exports.getFamousLimit = (event, context, callback) => {
  
  try {

    let sql = `
    SELECT to_json(r)
    FROM (
      select 
        id,
        name,
        image,
        domain,
        industry,
        occupation,
        gender,
        birth_year,
        birth_place,
        country_code
      from famous_06
      where image <> 'Unknown'
      order by id
    ) r
    `
    
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
          body: JSON.stringify(res.rows.map(row => row['to_json']))
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
  catch {
    callback(null, 'Error!!!')
  }
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

module.exports.getDomains = (event, context, callback) => {
  
  let sql = `
  SELECT to_json(r)
  FROM (
    select distinct 
      domain,
      replace(initcap(domain), 'And', 'and')::varchar(256) as label
    from famous
    order by 1  
  ) r
  `
  
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
        body: JSON.stringify(res.rows.map(row => row['to_json']))
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

module.exports.getIndustries = (event, context, callback) => {
  
  try {

    const domain = event.queryStringParameters['domain']

    let sql = `
    SELECT to_json(r)
    FROM (
      select distinct
        industry,
        replace(initcap(industry), 'And', 'and')::varchar(256) as label
      from famous
      where domain = '${domain}'
      order by 1 
    ) r
    `
    
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
          body: JSON.stringify(res.rows.map(row => row['to_json']))
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
  catch {
    callback(null, 'domain querystring value required.')
  }

}

module.exports.getOccupations = (event, context, callback) => {
  
  try {

    const domain = event.queryStringParameters['domain']
    const industry = event.queryStringParameters['industry']

    let sql = `
    SELECT to_json(r)
    FROM (
      select distinct
        occupation,
        replace(initcap(occupation), 'And', 'and')::varchar(256) as label
      from famous
      where domain = '${domain}'
      and industry = '${industry}'
      order by 1
    ) r
    `
    
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
          body: JSON.stringify(res.rows.map(row => row['to_json']))
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
  catch {
    callback(null, 'domain and industry querystring values required.')
  }

}