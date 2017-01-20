import { Observable } from 'rxjs'
import { load, loadFetch } from './loader'


const source = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    observer.error('Stop!')
    observer.next(3)
    observer.complete()
})

source.subscribe(
    v => console.log(v),
    e => console.log(`err: ${e}`),
    () => console.log('complete')
)

const output = document.getElementById('output')
const button = document.getElementById('button')

let click = Observable.fromEvent(button, "click")

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
