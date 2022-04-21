const occupationsAll = [{'domain':'arts','industry':'dance','occupation':'dancer'}, {'domain':'arts','industry':'design','occupation':'architect'}, {'domain':'arts','industry':'design','occupation':'comic artist'}, {'domain':'arts','industry':'design','occupation':'designer'}, {'domain':'arts','industry':'design','occupation':'fashion designer'}, {'domain':'arts','industry':'design','occupation':'game designer'}, {'domain':'arts','industry':'film and theatre','occupation':'actor'}, {'domain':'arts','industry':'film and theatre','occupation':'comedian'}, {'domain':'arts','industry':'film and theatre','occupation':'film director'}, {'domain':'arts','industry':'fine arts','occupation':'artist'}, {'domain':'arts','industry':'fine arts','occupation':'painter'}, {'domain':'arts','industry':'fine arts','occupation':'photographer'}, {'domain':'arts','industry':'fine arts','occupation':'sculptor'}, {'domain':'arts','industry':'music','occupation':'composer'}, {'domain':'arts','industry':'music','occupation':'conductor'}, {'domain':'arts','industry':'music','occupation':'musician'}, {'domain':'arts','industry':'music','occupation':'singer'}, {'domain':'business and law','industry':'business','occupation':'businessperson'}, {'domain':'business and law','industry':'business','occupation':'producer'}, {'domain':'business and law','industry':'law','occupation':'lawyer'}, {'domain':'exploration','industry':'explorers','occupation':'astronaut'}, {'domain':'exploration','industry':'explorers','occupation':'explorer'}, {'domain':'humanities','industry':'history','occupation':'historian'}, {'domain':'humanities','industry':'language','occupation':'critic'}, {'domain':'humanities','industry':'language','occupation':'journalist'}, {'domain':'humanities','industry':'language','occupation':'linguist'}, {'domain':'humanities','industry':'language','occupation':'writer'}, {'domain':'humanities','industry':'philosophy','occupation':'philosopher'}, {'domain':'institutions','industry':'government','occupation':'diplomat'}, {'domain':'institutions','industry':'government','occupation':'judge'}, {'domain':'institutions','industry':'government','occupation':'nobleman'}, {'domain':'institutions','industry':'government','occupation':'politician'}, {'domain':'institutions','industry':'government','occupation':'public worker'}, {'domain':'institutions','industry':'military','occupation':'military personnel'}, {'domain':'institutions','industry':'military','occupation':'pilot'}, {'domain':'institutions','industry':'religion','occupation':'religious figure'}, {'domain':'public figure','industry':'activism','occupation':'social activist'}, {'domain':'public figure','industry':'companions','occupation':'companion'}, {'domain':'public figure','industry':'media personality','occupation':'celebrity'}, {'domain':'public figure','industry':'media personality','occupation':'chef'}, {'domain':'public figure','industry':'media personality','occupation':'magician'}, {'domain':'public figure','industry':'media personality','occupation':'model'}, {'domain':'public figure','industry':'media personality','occupation':'pornographic actor'}, {'domain':'public figure','industry':'media personality','occupation':'presenter'}, {'domain':'public figure','industry':'outlaws','occupation':'extremist'}, {'domain':'public figure','industry':'outlaws','occupation':'mafioso'}, {'domain':'public figure','industry':'outlaws','occupation':'pirate'}, {'domain':'science and technology','industry':'computer science','occupation':'computer scientist'}, {'domain':'science and technology','industry':'engineering','occupation':'engineer'}, {'domain':'science and technology','industry':'invention','occupation':'inventor'}, {'domain':'science and technology','industry':'math','occupation':'mathematician'}, {'domain':'science and technology','industry':'math','occupation':'statistician'}, {'domain':'science and technology','industry':'medicine','occupation':'physician'}, {'domain':'science and technology','industry':'natural sciences','occupation':'archaeologist'}, {'domain':'science and technology','industry':'natural sciences','occupation':'astronomer'}, {'domain':'science and technology','industry':'natural sciences','occupation':'biologist'}, {'domain':'science and technology','industry':'natural sciences','occupation':'chemist'}, {'domain':'science and technology','industry':'natural sciences','occupation':'geologist'}, {'domain':'science and technology','industry':'natural sciences','occupation':'physicist'}, {'domain':'science and technology','industry':'social sciences','occupation':'anthropologist'}, {'domain':'science and technology','industry':'social sciences','occupation':'economist'}, {'domain':'science and technology','industry':'social sciences','occupation':'geographer'}, {'domain':'science and technology','industry':'social sciences','occupation':'political scientist'}, {'domain':'science and technology','industry':'social sciences','occupation':'psychologist'}, {'domain':'science and technology','industry':'social sciences','occupation':'sociologist'}, {'domain':'sports','industry':'individual sports','occupation':'athlete'}, {'domain':'sports','industry':'individual sports','occupation':'boxer'}, {'domain':'sports','industry':'individual sports','occupation':'chessmaster'}, {'domain':'sports','industry':'individual sports','occupation':'cyclist'}, {'domain':'sports','industry':'individual sports','occupation':'golfer'}, {'domain':'sports','industry':'individual sports','occupation':'gymnast'}, {'domain':'sports','industry':'individual sports','occupation':'martial arts'}, {'domain':'sports','industry':'individual sports','occupation':'mountaineer'}, {'domain':'sports','industry':'individual sports','occupation':'racecar driver'}, {'domain':'sports','industry':'individual sports','occupation':'skater'}, {'domain':'sports','industry':'individual sports','occupation':'skier'}, {'domain':'sports','industry':'individual sports','occupation':'snooker'}, {'domain':'sports','industry':'individual sports','occupation':'swimmer'}, {'domain':'sports','industry':'individual sports','occupation':'tennis player'}, {'domain':'sports','industry':'individual sports','occupation':'wrestler'}, {'domain':'sports','industry':'team sports','occupation':'american football player'}, {'domain':'sports','industry':'team sports','occupation':'baseball player'}, {'domain':'sports','industry':'team sports','occupation':'basketball player'}, {'domain':'sports','industry':'team sports','occupation':'coach'}, {'domain':'sports','industry':'team sports','occupation':'cricketer'}, {'domain':'sports','industry':'team sports','occupation':'hockey player'}, {'domain':'sports','industry':'team sports','occupation':'referee'}, {'domain':'sports','industry':'team sports','occupation':'soccer player'}]