import axios from 'axios'
import dps from 'dbpedia-sparql-client'
import { nluNewsApiRoot } from '../config'

const extract = _ => _.data
const newsApi = axios.create({
  baseURL: nluNewsApiRoot,
  timeout: 10000,
})

export function lookupLocation({ place /* better yet URI? */ }) {
  const query = `
  PREFIX dbpedia2: <http://dbpedia.org/property/>
  PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX dbo: <http://dbpedia.org/ontology/>
  SELECT * WHERE {
    ?s rdfs:label "${place}"@en ;
    dbo:abstract ?description ;

    rdfs:comment ?comment .
      OPTIONAL { ?s geo:lat ?lat } .
      OPTIONAL { ?s geo:long ?long } .
      OPTIONAL { ?s dbo:thumbnail ?thumb } .
      OPTIONAL { ?s dbpedia2:logoImage ?thumb } .
      OPTIONAL { ?s dbo:openingDate ?openingDate } .
      OPTIONAL { ?s dbpedia2:opened ?openingDate } .
  FILTER ( lang(?description) = "en")
  FILTER ( lang(?comment) = "en")
  }
  `
  return dps
    .client()
    .query(query)
    .asJson()
}

export function analyze(url) {
  return newsApi({
    method: 'post',
    url: '/nlu_analyze',
    data: {
      url: url || 'www.cnn.com',
    },
  }).then(extract)
}
