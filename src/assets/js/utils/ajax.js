const promises ={};
export default function ajax(url) {
	if(!promises[url]){
		promises[url] = new Promise(resolve => {
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
	return promises[url]
}