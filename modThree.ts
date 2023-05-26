import FiniteAutomation  from './index';

export enum State {
	S0,
	S1,
	S2,
}
export type Alphabet = '0' | '1';

// FiniteAutomation usage demonstration
const moduloThreeFSM = (input: string): number => {
	// Initialization the values. Data may not be provided in full
	const states = new Set([State.S0, State.S1]);
	const alphabet = new Set<Alphabet>(['1']);
	const finalStates = new Set([State.S1, State.S2]);
	const transitionMap = new Map<State, Map<Alphabet, State>>(
		[[State.S0, new Map<Alphabet, State>([['0', State.S0]])]],
	);

	const fsm = new FiniteAutomation<State, Alphabet>(
		states,
		alphabet,
		undefined,
		finalStates,
		transitionMap
	);

	// Adding/modifying data after creation
	fsm.addStateItem(State.S2);
	fsm.addAlphabetItem('0');
	fsm.initialState = State.S0;
	fsm.addFinalStateItem(State.S0);
	fsm.addTransitionItem(State.S0, '1', State.S1);
	fsm.addTransitionItem(State.S1, '0', State.S2);
	fsm.addTransitionItem(State.S1, '1', State.S0);
	fsm.addTransitionItem(State.S2, '0', State.S1);
	fsm.addTransitionItem(State.S2, '1', State.S2);

	if (typeof input !== 'string') {
		throw new Error('You should provide a valid binary integer string');
	}

	return fsm.processInput(input.split('') as Alphabet[]);
};

// Usage with binary integer string
const thirteenModuloThree = moduloThreeFSM('1101');
const fourteenModuloThree = moduloThreeFSM('1110');
const fifteenModuloThree = moduloThreeFSM('1111');

console.log(thirteenModuloThree, fourteenModuloThree, fifteenModuloThree);

export default moduloThreeFSM;
