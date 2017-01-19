import { Observable } from 'rxjs'

const circle = document.getElementById('circle')
let source = Observable.fromEvent(document, "mousemove")
.map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
.filter(v => v.x < 500)
.delay(400)

function onNext(value) {
    circle.style.left = value.x
    circle.style.top = value.y
}
source.subscribe(
    onNext,
    (e) => console.log(`error ${e}`),
    () => console.log('complete')
)
