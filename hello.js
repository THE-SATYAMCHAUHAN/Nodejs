console.log("hello world");

let add = (a,b)=>{
    return a+b;
}
console.log(add(2,3));

let student ={
    name:'raj',
    class: 5,
    RollNo:15,
    greet:function(){
        console.log('my name is'+' '+this.name)
    }
}
student.greet();
