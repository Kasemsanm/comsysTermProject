$(document).ready(function(){

     $("#withPhoto").click(function (e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })

        e.preventDefault(); 

        var currentUrl = window.location.href;
        var url = "/product/catalogue/togglePhoto/";

        $.ajax({
            type: "GET",
            url: url,
            data: null,
            success: function (response) {
                window.location = currentUrl;
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
     });

    //create new task / update existing task
    $(".wishlist-btn").click(function (e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })

        e.preventDefault(); 

        var url = "/product/addToWishList/";

        //used to determine the http verb to use [add=POST], [update=PUT]
        var product_id = $(this).attr('data-value');
        url += product_id; 

        $.ajax({
            type: "GET",
            url: url,
            data: null,
            success: function (response) {

                if(response.isLike){
                    $(".wishlist_"+product_id).addClass("active");
                } else {
                    $(".wishlist_"+product_id).removeClass("active");
                }

                $("#cartCount").text(response.cartCount + " ชิ้น");

            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });
});