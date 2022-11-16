import fetch from 'unfetch'
import { ActionType, EventType } from './types'
import config from './config'

const baseUrl = "https://stage-api.mydeepin.ir/v1/"

export function sendRequest(eventsArray: EventType[]): Promise<any> {
    let body: any = eventsArray[0]
    let endpoint = body.type

    if (eventsArray.length > 1) {
        endpoint = ActionType.Batch
        body = {
            type: ActionType.Batch,
            batch: eventsArray,
        }
    }
    if (typeof window !== 'undefined') {
        body.context = {
            agent: window.navigator.userAgent
        }
    }
    const url = baseUrl + endpoint

    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'write-key': config.configuration?.writeKey
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
}