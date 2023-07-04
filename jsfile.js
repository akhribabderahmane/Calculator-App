class Calculator{
    constructor(previousOpTextElement,currentOpTextElement){
    this.currentOpTextElement=currentOpTextElement;
    this.previousOpTextElement=previousOpTextElement;
    this.clear();
    }
    clear(){
       this.currentOp=''
       this.previousOp=''
       this.operation=undefined
    }
    delete(){
        this.currentOp=this.currentOp.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number==='.' && this.currentOp.includes('.')) return
       this.currentOp=this.currentOp.toString()+number.toString();
    }
    chooseOperation(operation){
        if(this.currentOp==='') return
        if(this,this.previousOp!==''){
           this.compute(); 
        }
       this.operation=operation;
       this.previousOp=this.currentOp;
       this.currentOp='';
    }
    compute(){
       let computation;
       const prev=parseFloat(this.previousOp); 
       const current=parseFloat(this.currentOp); 
       if(isNaN(prev) || isNaN(current)) return
       switch(this.operation){
          case "+":
            computation=prev+current;
            break;
            case "*":
                computation=prev*current;
            break;
            case "-":
                computation=prev-current;

            break;
            case "÷":
                if(current==0) return
                computation=prev / current;
            break;
            default:
                return
       }
       this.currentOp=computation;
      this.previousOp='';
      this.operation=""
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split(".")[0]);
        const decDigits = stringNumber.split(".")[1];
        let integerDisplay;
    
        if (isNaN(intDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
    
        if (decDigits != null) {
            return `${integerDisplay}.${decDigits}`;
        } else {
            return integerDisplay;
        }
    }
    
    updateDisplay(){
       this.currentOpTextElement.innerText=this.getDisplayNumber(this.currentOp)
       if(this.operation != null){
       this.previousOpTextElement.innerText= `${this.getDisplayNumber(this.previousOp)}  ${this.operation}`; 
       }else{
        this.previousOpTextElement.innerText='';
       }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton=document.querySelector('[data-delete]');
const AllclearButton=document.querySelector('[data-clear-all]');
const previousOpTextElement=document.querySelector('[data-previous-operand]');
const currentOpTextElement=document.querySelector('[data-current-operand]');

const calculator=new Calculator(previousOpTextElement,currentOpTextElement);
numberButtons.forEach(button => {
   button.addEventListener("click",()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
   }) 
});
operationButtons.forEach(button => {
    button.addEventListener("click",()=>{
     calculator.chooseOperation(button.innerText);
     calculator.updateDisplay();
    }) 
 });
equalButton.addEventListener('click',button=>{
    calculator.compute();
    calculator.updateDisplay();
})
AllclearButton.addEventListener("click",button=>{
    calculator.clear();
    calculator.updateDisplay()
})
deleteButton.addEventListener("click",button =>{
    calculator.delete();
    calculator.updateDisplay();
})

    