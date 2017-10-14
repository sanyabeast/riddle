"use strict";
define(function(){

    var lib = {
        linear : function(x){ return x; },
        sigmoid : function(x){ return (1 / (1 + Math.pow(Math.E, -1 * x))); },
        hyperb_tan : function(x){  return (Math.pow(Math.E, 2 * x) - 1) / (Math.pow(Math.E, 2 * x) + 1); }
    };


    class Neuron {
        constructor(riddle, xIndex, yIndex){
            this.meta = {
                xIndex : xIndex,
                yIndex : yIndex
            };

            this.riddle = riddle;
            this.content = {};
        }

        input(data){
            console.log(data);
        }

        get nextLayer(){
            var xIndex = this.meta.xIndex;
            return this.riddle.content[xIndex + 1] || null;
        }
    }

    class Riddle {
        constructor(/*obj*/options){
            this.options = options;
            this.content = this.genRiddleGrid(options.width, options.height);
        }

        get lib(){ return lib; } 

        get inputLayer(){
            return this.content[0];
        }

        pass(/*arr*/data){
            this.iterateArray(data, function(value, index){
                if (this.inputLayer[index]){
                    console.log(value);
                    this.inputLayer[index].input(value);
                }
            }, this);
        }

        genRiddleGrid(x, y){
            var arr = this.gen2DArray(x, y);

            this.iterateArray(arr, function(layer, xIndex){
                this.iterateArray(layer, function(placeholder, yIndex){
                    layer[yIndex] = new Neuron(this, xIndex, yIndex);
                }, this); 
            }, this);

            return arr;
        }

        gen2DArray(x, y){
            var arr = [];
            for (var xx = 0; xx < x; xx++){
                arr[xx] = [];

                for (var yy = 0; yy < y; yy++){
                    arr[xx][yy] = null;
                }

            }

            return arr;

        }

        iterateArray(arr, callback, context){
            for (var a = 0, l = arr.length; a < l; a++){
                callback.call(context, arr[a], a);
            }
        }
    }

    return Riddle;

});