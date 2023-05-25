export type TransitionMap<StateItem, AlphabetSymbol> = Map<StateItem, Map<AlphabetSymbol, StateItem>>;

export default class FiniteAutomation<StateItem, AlphabetSymbol> {
	public states: Set<StateItem>;
	public alphabet: Set<AlphabetSymbol>;
	public initialState: StateItem | undefined;
	public finalStates: Set<StateItem>;
	public transitionMap: TransitionMap<StateItem, AlphabetSymbol>;

	constructor(
		states?: Set<StateItem>,
		alphabet?: Set<AlphabetSymbol>,
		initialState?: StateItem,
		finalStates?: Set<StateItem>,
		transitionMap?: TransitionMap<StateItem, AlphabetSymbol>,
	) {
		this.states = states ?? new Set<StateItem>();
		this.alphabet = alphabet ?? new Set<AlphabetSymbol>();
		this.initialState = initialState;
		this.finalStates = finalStates ?? new Set<StateItem>();
		this.transitionMap = transitionMap ?? new Map<StateItem, Map<AlphabetSymbol, StateItem>>();
	}

	public addStateItem(state: StateItem) {
		this.states.add(state);
	}

	public addAlphabetItem(alphabet: AlphabetSymbol) {
		this.alphabet.add(alphabet);
	}

	public setInitialState(initialState: StateItem) {
		this.initialState = initialState;
	}

	public addFinalStateItem(state: StateItem) {
		this.finalStates.add(state);
	}

	public addTransitionItem(fromState: StateItem, symbol: AlphabetSymbol, toState: StateItem) {
		this.checkStateItemValidity(fromState);
		this.checkAlphabetSymbolValidity(symbol);
		this.checkFinalStateItemValidity(toState);

		if (this.transitionMap.has(fromState)) {
			this.transitionMap.get(fromState).set(symbol, toState);
		} else {
			this.transitionMap.set(fromState, new Map<AlphabetSymbol, StateItem>([[symbol, toState]]));
		}
	}

	public processInput(input: AlphabetSymbol[]): StateItem {
		let currentState = this.initialState;

		for (const symbol of input) {
			this.checkAlphabetSymbolValidity(symbol);

			if (this.transitionMap.has(currentState)) {
				const transitions = this.transitionMap.get(currentState);
				const nextState = transitions.get(symbol);

				if (this.states.has(nextState) || this.finalStates.has(nextState)) {
					currentState = nextState;
				}
			}
		}

		return currentState;
	}

	private checkStateItemValidity(stateItem: StateItem) {
		if (!this.states.has(stateItem)) {
			throw new Error(`There is no '${stateItem}' specified in states`);
		}
	}

	private checkFinalStateItemValidity(finalStateItem: StateItem) {
		if (!this.finalStates.has(finalStateItem)) {
			throw new Error(`There is no '${finalStateItem}' specified in final states`);
		}
	}

	private checkAlphabetSymbolValidity(alphabetSymbol: AlphabetSymbol) {
		if (!this.alphabet.has(alphabetSymbol)) {
			throw new Error(`There is no '${alphabetSymbol}' specified in alphabet`);
		}
	}
}
