<template>
	<div id="app">
		<!-- NAVBAR -->
		<div id="nav">
			<md-toolbar class="md-accent" md-elevation="1">
				<h3 class="md-title" style="flex: 1">
					<img src="./assets/e-date.png" alt="E-Date logotipo" class="logo">
				</h3>				
				<router-link to="/">
					<md-button>App</md-button>
				</router-link>
				<router-link to="/about">
					<md-button>Informacion</md-button>
				</router-link>
				<router-link to="/registrer">
					<md-button>Registro</md-button>
				</router-link>					
			</md-toolbar>
		</div>
		<keep-alive>
			<router-view/>
		</keep-alive>
		<notifications group="error" position="top center"/>
		<notifications group="login" position="top center"/>
		<notifications group="success" position="top center" class="success"/>
		<md-toolbar md-elevation="0" class="footer container-fluid">
			<span class="col-12 text-center">Developed <a target="_blank" href="https://github.com/victorst79">Víctor Santaella Torres</a></span>
			<span class="col-12 text-center">Code available on <a target="_blank" href="https://github.com/victorst79/e-date-CRM">Github</a></span>
		</md-toolbar>
	</div>
</template>

<style lang="scss" scope>
	@import "~vue-material/dist/theme/engine";
	$primary: #7f39fb;
	$secundary: #673ab7;
	@include md-register-theme("default", (
		primary: $primary, 
		accent: $secundary
	));

	@import "~vue-material/dist/theme/all";

	div#app{
		overflow-x: hidden;
	}

	#nav h3{
		color: white;

		.md-button-content{
			color: white;
			text-decoration: none !important;

			&:hover{
				color: white;
				text-decoration: none !important;
			}
		}
	}

	.footer{
		text-align: center;
		background-color: black !important;
		width: 100vw;

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

	.logo{
		width: 50px;
	}
</style>
