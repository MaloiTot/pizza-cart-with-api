
document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
		init() {
			
			
			axios
				.get('https://pizza-cart-api.herokuapp.com/api/pizzas')
				.then((result) => {

				this.pizzas = result.data.pizzas;
							
				})

				.then(() => {
				return this.createCart();

				})
			
			
				.then((result)=> {
				console.log(result.data)
				this.cartId = result.data.cart_code;
			});
		}, 
		createCart() {
                return axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
            },


		showCart() {
                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;
                axios
                    .get(url)
                    .then((result) => {
                        this.cart = result.data;
                    });

		},

		pizzaImage(pizza) {
			return `img/${pizza.size}.png`
		},

		show: false,
		message : 'Cart ID Below:',
		message2 : '',
		username : 'Tot',
		pizzas : [],
		cartId : '',
		cart   : {total : 0},
		
		add(pizza) {
			const params = {
				cart_code: this.cartId,
				pizza_id: pizza.id

			}
			
			axios
			.post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
			.then(() => this.message2 = "pizza added to cart")
			.catch(err => alert(err));
		this.message2 = "pizza added to cart"
		this.showCart();


			
			//alert(pizza.flavour + " : " + pizza.size)
		}
      }
    });
})


