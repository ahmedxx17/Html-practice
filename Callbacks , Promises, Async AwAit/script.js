
function login(u,p,cb)
{
    setTimeout(()=>{
        if(u==="ahmad" && p==="123")
            {
            cb(null,{user:u,role:"customer"})
        }else cb("bad creds",null)
    },700)
}

function getProducts(cb){
    setTimeout(()=>{
        cb(null,["shoes","watch","hoodie","keyboard"])
    },500)
}

function chooseRandom(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

function pay(item){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            Math.random()>0.3?res(`payment ok for ${item}`):rej(`payment failed for ${item}`)
        },1000)
    })
}

async function asyncFlow(u,p){
    try{
        let user=await new Promise((resolve,reject)=>{
            login(u,p,(e,d)=>e?reject(e):resolve(d))
        })
        console.log("logged in:",user)
        let prods=await new Promise((resolve,reject)=>{
            getProducts((e,d)=>e?reject(e):resolve(d))
        })
        console.log("products:",prods)
        let pick=chooseRandom(prods)
        console.log("picked:",pick)
        let res=await pay(pick)
        console.log(res)
    }catch(err){console.log("asyncFlow err:",err)}
}

function scopeMadness(){
    for(var i=0;i<2;i++){
        setTimeout(()=>console.log("var-scope i:",i),400)
    }
    for(let j=0;j<2;j++){
        setTimeout(()=>console.log("let-scope j:",j),400)
    }
    if(true){
        var a="using var in if"
        let b="using let in if"
        console.log(a)
        console.log(b)
    }
    console.log("outside if:",a)
    try{
        console.log("outside if let:",b)
    }catch(e){
        console.log("b exploded:",e.message)
    }
}

login("ahmad","123",(err,user)=>{
    if(err) return console.log("login error:",err)
    console.log("callback login ok:",user)
    getProducts((e,items)=>{
        if(e) return console.log("prod err:",e)
        console.log("callback products:",items)
    })
})

fetchData=()=>new Promise((res,rej)=>{
    setTimeout(()=>{
        Math.random()>0.5?res({msg:"data ok"}):rej("network fail")
    },600)
})

fetchData().then(x=>{
    console.log("promise .then got:",x)
}).catch(e=>{
    console.log("promise fail:",e)
})

asyncFlow("ahmad","123")
scopeMadness()

function coinFlip(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            Math.random()>0.5?res("Heads"):rej("Tails")
        },500)
    })
}
coinFlip()
.then(x=>console.log("Coin result:",x))
.catch(e=>console.log("Coin fail:",e))

function stepOne(x){
    return new Promise(r=>setTimeout(()=>r(x+1),400))
}
function stepTwo(y){
    return new Promise(r=>setTimeout(()=>r(y*2),400))
}
function stepThree(z){
    return new Promise(r=>setTimeout(()=>r(z-3),400))
}
stepOne(5)
.then(stepTwo)
.then(stepThree)
.then(f=>console.log("Chain final:",f))
.catch(err=>console.log("Chain error:",err))

function fakeFetch(id){
    return new Promise((res,rej)=>{
        let t=Math.floor(Math.random()*1000)+200
        setTimeout(()=>{
            Math.random()>0.2?res(`data-${id}`):rej(`err-${id}`)
        },t)
    })
}
Promise.all([fakeFetch(1),fakeFetch(2),fakeFetch(3)])
.then(d=>console.log("All ok:",d))
.catch(e=>console.log("All fail:",e))

Promise.race([fakeFetch("fast"),fakeFetch("slow"),fakeFetch("medium")])
.then(w=>console.log("Race won:",w))
.catch(e=>console.log("Race error:",e))

Promise.allSettled([fakeFetch("A"),fakeFetch("B"),fakeFetch("C")])
.then(r=>{
    console.log("AllSettled:")
    r.forEach(x=>console.log(x.status, x.value||x.reason))
})

fakeFetch("X")
.then(r=>{
    console.log("Got:",r)
    return fakeFetch("Y")
})
.then(r2=>{
    console.log(" got:",r2)
    return fakeFetch("Z")
})
.catch(e=>{
    console.log("Recovering from error:",e)
    return "Default-Value"
})
.then(last=>console.log("Final:",last))
