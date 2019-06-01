<template>
  <section id="no-user">
    <div class="no-user-head">
        <h1>E-Date</h1>
        <p>Cliente y Negocio mas cerca que nunca</p>
        <md-button class="md-raised md-primary">Unete</md-button>
    </div>
    <div class="no-user-content container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="header-title">
                    Elige tu tipo de cuenta y comienza a crecer con tu negocio.
                </h3>
            </div>
        </div>         
        <div class="row">
            <md-card class="col-md-5 col-12">
                <md-card-header>
                    <div class="md-title">Propietario</div>
                </md-card-header>

                <md-card-content>
                    Si eres dueño de un negocio y necesitas organizar tus citas, E-Date se compone de todo lo que necesitas.
                    Tus clientes podran elegir las horas disponibles de forma automatica, y tu como administrador solo tendras que preocuparte de no cansarte trabajando.
                </md-card-content>
            </md-card>
            <md-card class="offset-md-2 col-md-5 col-12">
                <md-card-header>
                    <div class="md-title">Cliente</div>
                </md-card-header>

                <md-card-content>
                    Se han terminado las llamadas por telefono para confirmar citas en tu negocio habitual, si necesitas una cita en la peluqueria, tu salon de estetica mas cercano
                    tan solo asegurate que disponga de E-Date y saber el dia y hora que quieres tu cita. Asi de facil. 
                </md-card-content>
            </md-card>
        </div>
    </div>
    <div class="no-user-explanation container">
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    ¿Como funciona?
                </h3>
            </div>            
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NoUser'
}
</script>

<style lang="scss" scope>
    .no-user-head{
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #673ab7;
        padding: 35px 0;
            
        h1{
            font-size: 3rem;
        }

        button{
            background: #673ab7;
        }
    }

    .no-user-content{
        margin-top: 30px;
    }

    .header-title{
        color: black;
        margin-bottom: 25px;
    }

    .boton-accion{
        background: #673ab7 !important;
    }

    .no-user-explanation{
        margin: 30px 0;
    }
</style>
