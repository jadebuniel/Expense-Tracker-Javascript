//Variables
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const dateInput = document.getElementById("date")
const submitButton = document.getElementById("submit-button")
const tableBody = document.getElementById("table-body")
const dataTotal = document.getElementById("data-total")

const costs = []
//Events

submitButton.addEventListener('click', addRow)
document.addEventListener("DOMContentLoaded", getLocal)
tableBody.addEventListener("click", deleteRow)

//Functions
function deleteRow(e){
 const rowItem = e.target.parentElement.parentElement
 // console.log(rowItem.children)
 if(e.target.classList[0] === "close-btn"){
  removeLocal(rowItem.children)
  rowItem.remove()
 } else {
  return
 }
}

function addRow(e){
 e.preventDefault()
 const houseObject = new Expense(nameInput.value, dateInput.value, priceInput.value)
 const {name, date, price} = houseObject
 const nameData = document.createElement('td')
 nameData.innerText = name
 const dateData = document.createElement('td')
 dateData.innerText = date
 const priceData = document.createElement('td')
 priceData.classList.add("d-flex", "align-items-center")
 const priceText = document.createElement("p")
 priceText.innerText = price
 priceText.style.display = 'inline-block'
 const closeButton = document.createElement('button')
 closeButton.classList.add("close-btn", "btn", "btn-danger", "ml-auto", "btn-sm")
 closeButton.innerText = 'x'
 const tableRow = document.createElement('tr')
 tableRow.appendChild(nameData)
 tableRow.appendChild(dateData)
 priceData.appendChild(priceText)
 priceData.appendChild(closeButton)
 tableRow.appendChild(priceData)
 tableBody.insertBefore(tableRow, tableBody.firstChild)
 addToLocal(houseObject)
 nameInput.value = ""
 dateInput.value = ""
 priceInput.value = ""
}

function addToLocal(todo){
 let todos = (localStorage.getItem("todos") === null) ? [] : JSON.parse(localStorage.getItem("todos"))
 todos.unshift(todo)
 const totalCosts = todos.reduce((total, cost) => total + parseInt(cost.price), 0)
 dataTotal.innerText = totalCosts
 todos = localStorage.setItem('todos', JSON.stringify(todos))

}

function getLocal(){
 let todos = (localStorage.getItem("todos") === null) ? [] : JSON.parse(localStorage.getItem("todos"))
 const sortedTodos = todos.sort((a, b) => {
  const dateA = new Date(`${a.date}T12:00:00+0000`)
  const dateB = new Date(`${b.date}T12:00:00+0000`)
  const resultA = dateA.getTime()
  const resultB = dateB.getTime()
  return resultA - resultB
 })
 const totalCosts = todos.reduce((total, cost) => total + parseInt(cost.price), 0)

 sortedTodos.forEach(todo => {
 const nameData = document.createElement('td')
 nameData.innerText = todo.name
 const dateData = document.createElement('td')
 dateData.innerText = todo.date
 const priceData = document.createElement('td')
 priceData.classList.add("d-flex", "align-items-center")
 const priceText = document.createElement("p")
 priceText.innerText = todo.price
 priceText.style.display = 'inline-block'
 const closeButton = document.createElement('button')
 closeButton.classList.add("close-btn", "btn", "btn-danger", "ml-auto", "btn-sm")
 closeButton.innerText = 'x'
 const tableRow = document.createElement('tr')
 tableRow.appendChild(nameData)
 tableRow.appendChild(dateData)
 priceData.appendChild(priceText)
 priceData.appendChild(closeButton)
 tableRow.appendChild(priceData)
 tableBody.insertBefore(tableRow, tableBody.firstChild)
 });
 dataTotal.innerText = totalCosts
}

function removeLocal(todo){
 let todos = (localStorage.getItem("todos") === null) ? [] : JSON.parse(localStorage.getItem("todos"))
 todos.splice(todos.findIndex(v => v.name === todo[0].innerText && v.date ===todo[1].innerText), 1 )
 const totalCosts = todos.reduce((total, cost) => total + parseInt(cost.price), 0)
 dataTotal.innerText = totalCosts
 todos = localStorage.setItem('todos', JSON.stringify(todos))


}

class Expense{
 constructor(name, date, price){
  this.name = name
  this.date = date
  this.price = price
  
 }
}