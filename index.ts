export type TransitionMap<StateItem, AlphabetSymbol> = Map<StateItem, Map<AlphabetSymbol, StateItem>>;

export default class FiniteAutomation<StateItem, AlphabetSymbol> {
	private _states: Set<StateItem>;
	private _alphabet: Set<AlphabetSymbol>;
	private _initialState: StateItem | undefined;
	private _finalStates: Set<StateItem>;
	private _transitionMap: TransitionMap<StateItem, AlphabetSymbol>;

	constructor(
		states?: Set<StateItem>,
		alphabet?: Set<AlphabetSymbol>,
		initialState?: StateItem,
		finalStates?: Set<StateItem>,
		transitionMap?: TransitionMap<StateItem, AlphabetSymbol>,
	) {
		this._states = states ?? new Set<StateItem>();
		this._alphabet = alphabet ?? new Set<AlphabetSymbol>();
		this._initialState = initialState;
		this._finalStates = finalStates ?? new Set<StateItem>();
		this._transitionMap = transitionMap ?? new Map<StateItem, Map<AlphabetSymbol, StateItem>>();
	}

	public get states(): Set<StateItem> {
		return this._states;
	}

	public set states(states) {
		this._states = states;
	}

	public get alphabet(): Set<AlphabetSymbol> {
		return this._alphabet;
	}

	public set alphabet(alphabet) {
		this._alphabet = alphabet;
	}

	public get initialState(): StateItem {
		return this._initialState;
	}

	public set initialState(initialState) {
		this._initialState = initialState;
	}

	public get finalStates(): Set<StateItem> {
		return this._finalStates;
	}

	public set finalStates(finalStates) {
		this._finalStates = finalStates;
	}

	public get transitionMap(): TransitionMap<StateItem, AlphabetSymbol> {
		return this._transitionMap;
	}

	public set transitionMap(transitionMap) {
		this._transitionMap = transitionMap;
	}

	public addStateItem(state: StateItem) {
		this._states.add(state);
	}

	public addAlphabetItem(alphabet: AlphabetSymbol) {
		this._alphabet.add(alphabet);
	}

	public addFinalStateItem(state: StateItem) {
		this._finalStates.add(state);
	}

	public addTransitionItem(fromState: StateItem, symbol: AlphabetSymbol, toState: StateItem) {
		this.checkStateItemValidity(fromState);
		this.checkAlphabetSymbolValidity(symbol);
		this.checkFinalStateItemValidity(toState);

		if (this._transitionMap.has(fromState)) {
			this._transitionMap.get(fromState).set(symbol, toState);
		} else {
			this._transitionMap.set(fromState, new Map<AlphabetSymbol, StateItem>([[symbol, toState]]));
		}
	}

	public processInput(input: AlphabetSymbol[]): StateItem {
		let currentState = this._initialState;

		for (const symbol of input) {
			this.checkAlphabetSymbolValidity(symbol);

			if (this._transitionMap.has(currentState)) {
				const transitions = this._transitionMap.get(currentState);
				const nextState = transitions.get(symbol);

				if (this._states.has(nextState) || this._finalStates.has(nextState)) {
					currentState = nextState;
				}
			}
		}

		return currentState;
	}

	private checkStateItemValidity(stateItem: StateItem) {
		if (!this._states.has(stateItem)) {
			throw new Error(`There is no '${stateItem}' specified in states`);
		}
	}

	private checkFinalStateItemValidity(finalStateItem: StateItem) {
		if (!this._finalStates.has(finalStateItem)) {
			throw new Error(`There is no '${finalStateItem}' specified in final states`);
		}
	}

	private checkAlphabetSymbolValidity(alphabetSymbol: AlphabetSymbol) {
		if (!this._alphabet.has(alphabetSymbol)) {
			throw new Error(`There is no '${alphabetSymbol}' specified in alphabet`);
		}
	}
}
