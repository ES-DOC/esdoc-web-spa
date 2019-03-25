import $ from 'jquery';
import DOCUMENTS from '@/static/data/cmip6-models'
import parse from '@/parsers/parseModel';

const ENV_TO_URL = {
    dev: "http://localhost:5000",
    prod: "https://api.es-doc.org",
    test: "https://test-api.es-doc.org"
}

const getApplicationMode = () => {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        } else {
            return 'prod';
        }
    } else {
        return 'dev';
    }
}

const getLoadURL = (project, { uid }) => {
    const mode = getApplicationMode()
    const params = `client=esdoc-explorer&project=${project}&id=${uid}&version=latest&encoding=json`

    return `${ENV_TO_URL[mode]}/2/document/search-id?${params}`
}

const getSearchURL = (project, documentType) => {
    const mode = getApplicationMode()
    const params = `document_version=latest&document_type=${documentType}&project=${project}`

    return `${ENV_TO_URL[mode]}/2/summary/search?${params}`
}

/**
 * Returns documents matched by project & institute identifiers.
 */
export const getMany = async (project, documentType) => {
    const url = getSearchURL(project, documentType);
    const { results: data } = await $.get(url);

    return data.map(i => {
        return {
            experiment: i[0],
            institute: i[1],
            longName: i[2],
            model: i[3],
            name: i[4],
            canonicalName: i[5],
            uid: i[6],
            version: i[7],
            alternativeName: i[8]
        };
    })
}

/**
 * Returns a document matched by project, institute & canonical-name identifiers.
 */
export const getOne = (project, institute, name) => {
    const many = getMany(project, institute)

    return many.find(i => i.canonicalID.toLowerCase() === name.toLowerCase())
}

/**
 * Returns a document matched by project, institute & canonical-name identifiers.
 */
export const loadOne = async (document) => {
    const url = getLoadURL('cmip6', document);
    console.log(url);
    const model = await $.get(url);

    return parse(model);
}
