<template>
	<div id="app">
		<!-- NAVBAR -->
		<div id="nav">
			<md-toolbar class="md-accent" md-elevation="1">
				<h3 class="md-title" style="flex: 1">E-Date</h3>				
				<router-link to="/">
					<md-button>App</md-button>
				</router-link>
				<router-link to="/about">
					<md-button>About</md-button>
				</router-link>				
			</md-toolbar>
		</div>
		<keep-alive>
			<router-view/>
		</keep-alive>
		<md-toolbar md-elevation="0" class="footer row">
			<span class="col-12 text-center">Developed by <a target="_blank" href="https://github.com/victorst79">Víctor Santaella Torres</a>.</span>
		</md-toolbar>
	</div>
</template>

<style lang="scss" scope>
	div#nav{
		background-color:#673ab7;
	}

	#nav h3{
		color: white;
	}

	.md-button-content{
		color: white;
		text-decoration: none !important;
	}

	.md-button-content:hover{
		color: white;
		text-decoration: none !important;
	}

	.footer{
		text-align: center;
		background-color: black;

		span{
			color: white;

			a{
				color: #673ab7;
				text-decoration: none;
				
				&:hover{
					color: #673ab7;
					text-decoration: none;
				}
			}
		}
	}
</style>
