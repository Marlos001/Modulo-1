console.log(resposta); 

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;
var easeAmount = 0.007; //Controlar a suavidade do movimento do peixe

function preload() {
    // Carregar imagens
    this.load.image('fundo', 'assets/bg_azul-escuro.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('peixe', 'assets/peixe/peixe_rosa.png');
    this.load.image('isca', 'assets/isca.png');
}

function create() {
    // Adicionar elementos à cena
    this.add.image(400, 300, 'fundo');
    this.add.image(400, 525, 'logo').setScale(0.5);
    isca = this.add.image(400, 300, 'isca').setScale(0.025);

    // Criar peixe
    peixinho = this.add.image(400, 300, 'peixe');
    peixinho.setScale(0.7).setOrigin(0.5, 0.5).setFlip(true, false);
}

function update() {
    // Calcular a diferença entre a posição do peixe e a posição do mouse
    var dx = this.input.x - peixinho.x;
    var dy = this.input.y - peixinho.y;

    // Aplicar suavização do movimento
    peixinho.x += dx * easeAmount;
    peixinho.y += dy * easeAmount;

    isca.x = this.input.x;
    isca.y = this.input.y;
}
