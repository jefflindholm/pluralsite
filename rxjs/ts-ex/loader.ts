import { Observable } from 'rxjs'

export function load(url: string) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest()
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText)
                observer.next(data)
                observer.complete()
            } else {
                observer.error(xhr.statusText)
            }
        })
        xhr.open('GET', url)
        xhr.send()
    }).retryWhen(retryStrategy({ tries: 4, delay: 1500 }))
}

export function loadFetch(url: string) {
    return Observable.defer(() => Observable.fromPromise(fetch(url).then(r => r.json())))
}

export function retryStrategy({ tries = 3, delay = 1000}) {
    return (errors) => {
        return errors
                .scan((acc, val) => {
                    console.log(acc, val)
                    return acc + 1
                }, 0)
                .takeWhile(acc => acc < tries)
                .delay(delay)
    }
}
