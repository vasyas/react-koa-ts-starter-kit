import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

export function goto(href) {
    history.push(href)
}

export function navigate(e) {
    e.preventDefault()

    const link: HTMLElement = e.currentTarget
    const href = link.getAttribute("href")

    history.push(href)
}