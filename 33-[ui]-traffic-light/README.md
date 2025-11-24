# [Traffic Light](https://www.greatfrontend.com/questions/user-interface/traffic-light/react?framework=react&tab=coding)

`Approx time - 15m`

## Things learnt

- How to come up with state machine for problems like "What next?"
- SetTimeout and cleanup function inside useEffect

---

#### 1. How to come up with state machine for problems like "What next?"

This problem is apt for a state machine because you clearly see that, something concrete should happen next at each stage. So if you identify this pattern then try to use state machine.

Red Light -> What next?

Next is "Green" -> What next at green?

"Yellow" -> What next at yellow?

So if you see this pattern then it is good for a state machine.
