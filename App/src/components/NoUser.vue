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
                    <div class="md-title"><md-icon>supervised_user_circle</md-icon> Propietario</div>
                </md-card-header>

                <md-card-content>
                    Si eres dueño de un negocio y necesitas organizar tus citas, E-Date se compone de todo lo que necesitas.
                    Tus clientes podrán elegir las horas disponibles de forma automática, y tú como administrador solo tendrás que preocuparte de no cansarte trabajando.
                </md-card-content>
            </md-card>
            <md-card class="offset-md-2 col-md-5 col-12 cliente">
                <md-card-header>
                    <div class="md-title"><md-icon>account_circle</md-icon> Cliente</div>
                </md-card-header>

                <md-card-content>
                    Se han terminado las llamadas por teléfono para confirmar citas en tu negocio habitual, si necesitas una cita en la peluquería, tu salón de estética más cercano tan solo asegurate que disponga de E-Date y saber el día y hora que quieres tu cita. Así de fácil. 
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
            <div class="col-12">
                <div class="row">
                    <div class="col-12 pasos-explicacion">
                        <md-steppers md-vertical>
                            <md-step id="first" md-label="¿Por que lo necesitas?">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi accusantium hic alias nam ullam tenetur possimus dolorem officia aperiam. Cumque hic enim voluptas ratione accusamus quasi eaque amet labore doloribus?</p>
                            </md-step>

                            <md-step id="second" md-label="¿Como funciona?">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                            </md-step>

                            <md-step id="third" md-label="Preocupate de lo que importa">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
                            </md-step>
                        </md-steppers>
                    </div>
                </div>
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

    .cliente{
        @media screen and (max-width: 758px) {
            margin-top: 50px;
        }
    }

    .pasos-explicacion{
        div.md-button-content{
            color: black !important;
        }

        .md-stepper-text{
            font-size: 1.5rem;
        }

        .md-stepper-number{
            background-color: #673ab7 !important;
            color: white;
        }

        i{
            fill: white !important;
        }
    }
</style>
