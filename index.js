

$(document).ready(function(){

    

    var total = 0;
    var orders = []

    $.get('data.js', {vegy: "vegy"}, function(){
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
    })

    $.get('data.js', {cereals: "cereals"}, function(){
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
    function product(name, price){
        this.name = name;
        this.price = price;
    }

    $(document).on('click', "#btn", function(e) {
        vegy.map(veg => {
            if(e.target.value == veg.id){
                var item = new product(veg.name,  veg.price)
                orders =[item , ...orders]
                total = total+veg.price;

                $('#table').append(`
                <tr>
                <td>${item.name}</td>
                 <td>${item.price}</td>
                </tr>
                `)
        
                $('#total').html(total)
            }
        })
       });

        $(document).on('click', "#btn", function(e) {
           cereals.map(cereal => {
               if(e.target.value == cereal.id){
              var item = new product(cereal.name,  cereal.price)
              orders =[item , ...orders]
                total = total+cereal.price
                   
                $('#table').append(`
                <tr>
                <td>${item.name}</td>
                 <td>${item.price}</td>
                </tr>
                `)
        
                $('#total').html(total)
               }
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
             orders.length = 0
           }
       }

    })

})




