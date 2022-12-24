export const priceToString=(n:number)=>{
    if(n.toString().length===7){
        return `${n.toString().slice(0,1)} ${n.toString().slice(1,4)} ${n.toString().slice(4,8)}`
    }else if(n.toString().length===8){
        return `${n.toString().slice(0,2)} ${n.toString().slice(2,5)} ${n.toString().slice(5,8)}`
    }else if(n.toString().length===6){
        return `${n.toString().slice(0,3)} ${n.toString().slice(3,6)}`
    }else if (n.toString().length===9){
        return `${n.toString().slice(0,3)} ${n.toString().slice(3,6)} ${n.toString().slice(6,9)}`
    }else if (n.toString().length===10){
        return `${n.toString().slice(0,1)} ${n.toString().slice(1,4)} ${n.toString().slice(4,7)} ${n.toString().slice(7,10)} `
    }else if (n.toString().length===5){
        return `${n.toString().slice(0,2)} ${n.toString().slice(2,5)}`
    }

}
