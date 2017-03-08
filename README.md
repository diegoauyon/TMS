# TMS

Simplified version of Martin Ugarte (Just to be sure that it will always live).

[Live version](https://diegoauyon.github.io/TMS/index.html)


## Syntax


```
name: [name_of_machine]
init: [initial_state]
accept: [accept_state_1],... ,[accept_state_n]
[current_state],[read_symbol]
[new_state],[write_symbol],[r|l|-]
```

where 

``` 
l = left
r = right
- = hold
_ = blanks
```

## Example

This give the binary sucesor of the binary input
**Note**: The first state already expects an input, so there is no need of a state q0 that goest from blank to something

```
name: binary_sucesor
init: q1
accept: qfin

q1,0
q1,0,r

q1,1
q1,1,r

q1,_
q2,_,l

q2,0
q3,1,l

q2,1
q2,0,l

q2,_
q4,_,-

q3,0
q3,0,l

q3,1
q3,1,l

q3,_
qfin,_,-

q4,_
q4,_,r

q4,0
q5,1,r

q5,0
q5,0,r

q5,_
q6,0,l

q6,0
q6,0,l

q6,1
q6,1,l

q6,_
qfin,_,-
```

