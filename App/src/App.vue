<template>
	<div id="app">
		<!-- NAVBAR -->
		<div id="nav">
			<md-toolbar class="md-accent" md-elevation="1">
				<h3 class="md-title" style="flex: 1">E-Date</h3>				
				<router-link to="/">
					<md-button>Home</md-button>
				</router-link>
				<router-link to="/about">
					<md-button>About</md-button>
				</router-link>
				<router-link to="/login">
					<md-button>Login</md-button>
				</router-link>
				
			</md-toolbar>
		</div>
		<router-view/>
	</div>
</template>

<style>
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
</style>
