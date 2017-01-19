import { Observable } from 'rxjs'

const output = document.getElementById('output')
const button = document.getElementById('button')

let click = Observable.fromEvent(button, "click")

function load(url: string) {
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

function loadFetch(url: string) {
    return Observable.defer(() => Observable.fromPromise(fetch(url).then(r => r.json())))
}

function retryStrategy({ tries = 3, delay = 1000}) {
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
function renderMovies(movies) {
    movies.forEach(m => {
        const div = document.createElement('div')
        div.innerText = m.title
        output.appendChild(div)
    })
}

click.flatMap(e => loadFetch('movies.json'))
    .subscribe(
        renderMovies,
        (e) => console.log(`error ${e}`),
        () => console.log('complete')
    )
