

$(document).ready(function(){

    

    var total = 0;
    var orders = []

    function product(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
    function placeOrder() {
        sessionStorage.setItem('order', JSON.stringify(orders));
        sessionStorage.setItem('total', JSON.stringify(total));
    }

    function getOrders() {
        orders = JSON.parse(sessionStorage.getItem('order'));
        total = JSON.parse(sessionStorage.getItem('total'));
    }

    

    if (sessionStorage.getItem("order") != null) {
        getOrders()
        orders.forEach(order => {
            $('#table').append(`
            <tr>
            <td>${order.name}</td>
             <td>${order.price}</td>
             <td><button id="rmv" value=${order.id}>remove</button></td>
            </tr>
            `)
            $('#total').html(total)   
    });  
    }


    $.get('data.js', [{vegy: "vegy"},{cereals: "cereals"}], function(){
        vegy.map((veg)=> (
          $('.v-products').append(`
          <div class="product">
          <img class="item" src=${veg.image} />
           <div class="description">
           <p>${veg.name}</p>
           <p>Price: ${veg.price}</p>
           <button id="btn" value=${veg.id}>Place Order</button>
           </div>
      </div>
          `)
        ))

        cereals.map((cereal)=> (
            $('.c-products').append(`
          <div class="product">
          <img class="item" src=${cereal.image} />
           <div class="description">
           <p>${cereal.name}</p>
           <p><span>Price:</span> ${cereal.price}</p>
           </div>
           <button id="btn" value=${cereal.id}>Place Order</button>
      </div>
          `)

        ))
    })

   
    $(document).on('click', "#btn", function(e) {
        vegy.map(veg => {
            if(e.target.value == veg.id){
                var item = new product(veg.id, veg.name,  veg.price)
                orders.push(item)
                total = total+veg.price;
                console.log(orders)

                orders.map(order => {
                    $('#table').append(`
                    <tr>
                    <td>${order.name}</td>
                     <td>${order.price}</td>
                     <td><button id="rmv" value=${order.id}>remove</button></td>
                    </tr>
                    `)
                    $('#total').html(total)   
            });  
                placeOrder()
                location.reload()
            }

        });

        cereals.map(cereal => {
            if(e.target.value == cereal.id){
           var item = new product(cereal.id ,cereal.name,  cereal.price)
              orders.push(item)
          
             total = total+cereal.price
             orders.map(order=> {
                 $('#table').append(`
                 <tr>
                 <td>${order.name}</td>
                  <td>${order.price}</td>
                  <td><button id="rmv" value=${order.id}>remove</button></td>
                 </tr>
                 `)
                 $('#total').html(total)
                 
             });
             placeOrder() 
             location.reload()
            }
        }) 
    
     
    });


          $(document).on('click', "#rmv", function(e) {

            orders.map((order, id) => {
                if(e.target.value == order.id){
                    total = total - order.price
                    var index = orders.indexOf(order);
                    orders.splice(index, 1)

                    $('#table').html(`
                    <tr>
                    </tr>
                    `)
            
                    $('#total').html(total)
                }


                placeOrder()
                location.reload()
            })

           });




    $("#check-btn").click(function(){
       if(orders.length == 0){
           alert("Make an order fisrt")
       }

       else{
           var name = prompt("Enter your name please")
           var address = prompt("Enter your home address please")

           if(name === '' || address === '' || name == null || address == null){
               alert("Please fill all the fields for convenience delivery")
           }
           else{
            alert(name + " ,Thank you for shopping with us" + "\n" + "Your order has been recieved and ready to be delivered to " + address
             + "\n" + "Total price:" + total)
             $('#table').html(`
             <tr>
             <td></td>
              <td</td>
             </tr>
             `)
     
             $('#total').html(0)
             location.reload()
           }
       }
    })



});




