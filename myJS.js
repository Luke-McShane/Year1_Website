function signUp(){
				//This brings up an alert box for the user, displaying a message
				alert("You have successfully signed up to our newsletter!")
			}
//This piece of code runs the "updateCart" procedure as soon as the window has loaded			
window.onload = updateCart;

function updateCart(){
	//Checks if the browser utilizes local/session storage or not
	if(typeof(Storage) != "undefined"){
		//This logs the cartTotal to the console
		console.log((Number(localStorage.getItem("cartTotal"))).toFixed(2));
		//This accesses the "cartTotal" element and then accesses the HTML of this element. The HTML is then altered.
		//localStorage.getItem() retrives the data saved in local storage by searching for data that yields the "cartTotal" key.
		//This information retrieved from storage is then converted into a number and set so it may only have 2 decimal places
		document.getElementById("cartTotal").innerHTML = "Total: £" + Number((localStorage.getItem("cartTotal"))).toFixed(2);
	}
	//If there is no storage, an error message is logged to the console
	else{
		console.log("Sorry, there is no web storage support");
	}
	
}



//This is a large function that sets up draggable and droppable properties on any class called "imgs" and any ID called "dragPic". 
//All of this data is present only on the products page, this is important as it is only this page that requires dragging and dropping
$(function(){
//This statements alone makes anything with the "imgs" class draggable
//The "$" sign specifies the jQuery is being used
$('.imgs').draggable(
{
	//This ensures that the dragged item will revert to its original position upon release
	revert:true,
	//This creates a clone of the dragged item so the user is informed about what they are dragging 
	proxy:"clone",
	//This specifies where the cursor is to prevent any offset errors/mishaps when the draggable item is reverted
	cursorAt: { left: 75, top: 75 },
	//When the item has been let go inside a droppable area, it snaps back into place instead of slowly drifting back
	snap: true,
	//This procedure is called when the item has started to be dragged
    onStartDrag:function(){
		//"this" is a reference to the DOM element of the procedure/the item being dragged
		//This accesses the options of the item when it is being dragged, then alters the cursor setting to display a "not-allowed" sign/symbol
        $(this).draggable('options').cursor = 'not-allowed';
		//This sets the z-index to a value which ensures the dragged item will not be covered by any other elements when being dragged
        $(this).draggable('proxy').css('z-index',10);
    },
    onStopDrag:function(){
        $(this).draggable('options').cursor='move';
    }
});

//The object with the "dragPic" ID selector are now droppable
$('#dragPic').droppable(
{
	onDragEnter:function(e,source){
        $(source).draggable('options').cursor='auto';
    },
	onDragLeave:function(e,source){
        $(source).draggable('options').cursor='not-allowed';
    },
	onDrop:function(e, source){
		$(source).draggable("options").cursor="auto";
		//This accesses the HTML of the source (the item being dropped into the droppable area), accesses the first H3 tag within th source (eq:(0) means accesses the first H3 tag, eq:(1) would mean the second and so on..) and saves the HTML of this tag as a variable
        var priceH3 = $(source).find('h3:eq(0)').html();
		var itemH3 = $(source).find('h3:eq(1)').html();
		var quantityH3 = $(source).find('h3:eq(2)').html();
		//parseFloat parses a string and returns a floating point number.
		//"split("£")" splits the string into chunks in an array wherever a "£" is present.
		//[1] signifies the second item within this array. This is a number.
		var price = parseFloat(priceH3.split('£')[1]);
		var item =  parseFloat(itemH3.split(':')[1]);
		var quantity =  parseFloat(quantityH3.split(':')[1]);
		//This reduces the value of "item" by 1, this is because in coding 0 specifies the beginning of a list/array.
		var item = Number(item) - 1;
		//Passes these three variables through a procedure as arguments
		updateCartArray(item, quantity, price);
		
	},
	onDragLeave:function(e,source){
        $(source).draggable('options').cursor='not-allowed';
    }
});

});

//This is a JSON array and will need to be converted in order for it to become a JavaScript object
var cartData = [{"Name": "Megadeth", "Price": 0,"Quantity": 0},{"Name": "Sabbath", "Price": 0, "Quantity": 0},{"Name": "Led Zep", "Price": 0, "Quantity": 0},{"Name": "Floyd", "Price": 0, "Quantity": 0},{"Name": "Anthrax", "Price": 0, "Quantity": 0},{"Name": "Zappa", "Price": 0, "Quantity": 0},{"Name": "Pantera", "Price": 0, "Quantity": 0},{"Name": "Hendrix", "Price": 0, "Quantity": 0}];


function updateCartArray(pos, qty, pri){
	//Accesses the JSON array and updates the price and quantity of the specified item
	cartData[pos].Price+=pri;
	cartData[pos].Quantity+=qty;
	//This sets an item called "cartData" in local storage. Local storage is used as the data is never erased, even whent he tab is closed the data will still be there.
	//The JSON array is converted into a JavaScript object to allow it to be stored in local storage.
	localStorage.setItem("cartData", JSON.stringify(cartData))
	totalPrice = 0;
	//A for loop that iterates through the cartData array
	for(i=0; i<cartData.length; i++)
	{
		//Updates the total price, this is a variable that is used to work out the accumulated cost of the items
		totalPrice += cartData[i].Price;
	}
	localStorage.setItem("cartTotal", totalPrice);
	updateCart();
}

function updateCart(){
	if(typeof(Storage) != "undefined"){
		//Alters the HTML of "cartTotal" and changes it to the next current total, this is done by accessing local storage.
		//This could have been otherwise done by passing totalPrice through as an argument
		document.getElementById("cartTotal").innerHTML = "Total: £" + Number((localStorage.getItem("cartTotal"))).toFixed(2);
	
	
	}
	else{
		console.log("Sorry, there is no web storage support");
	}
	
}

function allowDrop(event){
	//This ensures that the default event of the action will not be triggered
	event.preventDefault();
}
function endDrag(event, id, qty, pri){
	console.log("Dragging has ended");
}

function loadContainers(){
	//This single procedure is used to call 3 separate procedures
	getContainer1();
	getContainer2();
	getContainer3();
}

function getContainer1(){
	var string = "";
	var cartDataArrayJSON = localStorage.getItem("cartData");
	//This parses the array into a JSON array to allow it to be manipulated.
	//In this case, the array is accessed and data is appended to a blank string variable
	var cartDataArray =JSON.parse(cartDataArrayJSON);
	for(i=0; i<8;i++)
	{	
		string += cartDataArray[i].Name;
		string += "\n"
	}	
	document.getElementById("container1").innerHTML = string;
}

function getContainer2(){
	var string2 = 0;
	var stringTot = "";
	var cartDataArrayJSON = localStorage.getItem("cartData");
	var cartDataArray =JSON.parse(cartDataArrayJSON);
	for(i=0; i<8;i++)
	{	
		string2 += cartDataArray[i].Quantity;
		string2 += "\n"
	}	
	
	document.getElementById("container2").innerHTML = string2;
}

function getContainer3(){
	var string3 = "";
	var cartDataArrayJSON = localStorage.getItem("cartData");
	var cartDataArray =JSON.parse(cartDataArrayJSON);
	for(i=0; i<8;i++)
	{	
		string3 += Number(cartDataArray[i].Price).toFixed(2);
		string3 += "\n"
	}	
	document.getElementById("container3").innerHTML = string3;
}