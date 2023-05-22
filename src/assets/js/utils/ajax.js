
export default function ajax(url) {
	return new Promise(resolve => {
		let xml = new XMLHttpRequest()
		xml.addEventListener('readystatechange', function () {
			if (this.status === 200 && this.readyState === 4) {
				resolve(this.responseText)
			}
		})
		xml.open('GET', url, true)
		xml.setRequestHeader("Accept", "text/html")
		xml.send()
	})
}