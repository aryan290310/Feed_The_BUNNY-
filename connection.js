class Connection{
 constructor(a,b){
  var lastlink= a.bodies.length-2
  this.link=Constraint.create({
    
    bodyA:a.bodies[lastlink],
    bodyB:b,
    length:-1000,
    stiffness:0.01,
    pointA:{x:0,y:0},
    pointB:{x:0,y:0},
  })  
World.add(world,this.link)
 }
 connectionbreak(){
  World.remove(world,this.link)
 }
}
