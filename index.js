

$(document).ready(function(){

    

    var total = 0;

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
                total = total+cereal.price
                   console.log(item)
               }
           })
          });

    

})




