window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx);    // for future reference to see ctx properties

    class Particle {
        constructor(){

        }
        draw(){

        }
        update(){

        }
    }

    class Effect {
        constructor(context , canvasWidth, canvasHeight){
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = canvasWidth/2;
            this.textY = canvasHeight/2;
            this.fontSize = 100;
            this.lineHeight = this.fontSize * 0.8;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.textInput = document.getElementById('textInput');
            this.textInput.addEventListener('keyup', (e) => {
                if(e.key !==' '){
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.wrapText(e.target.value);
                }
            });
            //particle settings
            this.particles = [];
            this.gap = 3;
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0,
            }
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
        }
        wrapText(text){
            // canvas settings
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);  // expects 4 arguments (x0, y0, x1, y1)
            gradient.addColorStop(0.3, 'red');
            gradient.addColorStop(0.5, 'fuchsia');
            gradient.addColorStop(0.7, 'purple');
            ctx.fillStyle = gradient;
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.lineWidth = 3;
            this.context.strokeStyle = 'white';
            this.context.font = this.fontSize + 'px Helvetica';
            // break multiline text
            let lineArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for( let i = 0 ; i < words.length; i++){
                let testLine = line + words[i] + ' ';
                if(this.context.measureText(testLine).width > this.maxTextWidth){
                    line = words[i] + ' ';
                    lineCounter++;
                }else {
                    line = testLine;
                }
                lineArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            let textY = this.canvasHeight/2 - textHeight/2;
            lineArray.forEach((el, index) => {
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });
            this.convertToParticles();
        }
        convertToParticles(){
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            for(let y = 0 ; y < this.canvasHeight; y += this.gap){
                for(let x = 0 ; x < this.canvasWidth; x += this.gap){
                    const index = (y * this.canvasWidth + x) * 4;  // 4 is for rgba values
                    const alpha = pixels[index + 3];  // alpha value of the pixel for transparency
                    if(alpha > 0){
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb(${red}, ${green}, ${blue})`;
                    }
                }
            }
        }
        render(){

        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText('Hello World');

    function animate (){

    }




    // function wrapText(text){
    //     let lineArray = [];
    //     let lineCounter = 0;
    //     let line = '';
    //     let words = text.split(' ');  // split the text into words (array)  , (for every space encountered)
    //     for(let i = 0 ; i < words.length; i++){
    //         let testLine = line + words[i] + ' ';
    //         if(ctx.measureText(testLine).width > maxTextWidth){
    //             line = words[i] + ' ';
    //             lineCounter++;
    //         }else {
    //             line = testLine;
    //         }
    //         lineArray[lineCounter] = line;
    //     }
    //     let textHeight = lineHeight * lineCounter;
    //     let textY = canvas.height/2 - textHeight/2;
    //     lineArray.forEach((el, index) => {
    //         ctx.fillText(el, canvas.width/2, textY + index * lineHeight);
    //     });
    //     console.log(lineArray);
    // }



});