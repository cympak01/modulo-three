import { beforeEach, describe, expect, test } from '@jest/globals';
import FiniteAutomation from './index';
import moduloThreeFSM, { Alphabet, State } from './modThree';

describe('Assessment', () => {
	describe('Tests for FiniteAutomation', () => {
		let FA: FiniteAutomation<State, Alphabet>;

		beforeEach(() => {
			FA = new FiniteAutomation();
		});

		test('Should handle creation without provided parameters', () => {
			expect(FA.states).toStrictEqual(new Set());
			expect(FA.alphabet).toStrictEqual(new Set());
			expect(FA.initialState).toBe(undefined);
			expect(FA.finalStates).toStrictEqual(new Set());
			expect(FA.transitionMap).toStrictEqual(new Map());
		});

		test('Should handle creation with partial provided parameters', () => {
			const states = new Set([State.S0, State.S1]);
			const alphabet = new Set<Alphabet>(['1']);
			const finalStates = new Set([State.S1, State.S2]);
			const _FA: FiniteAutomation<State, Alphabet> = new FiniteAutomation(
				states,
				alphabet,
				undefined,
				finalStates,
			);

			expect(_FA.states).toStrictEqual(states);
			expect(_FA.alphabet).toStrictEqual(alphabet);
			expect(_FA.initialState).toBe(undefined);
			expect(_FA.finalStates).toStrictEqual(finalStates);
			expect(_FA.transitionMap).toStrictEqual(new Map());
		});

		test('Should handle adding parameters after initialization', () => {
			FA.addStateItem(State.S0);
			FA.addStateItem(State.S1);
			expect(FA.states).toStrictEqual(new Set([State.S0, State.S1]));

			FA.addAlphabetItem('0');
			expect(FA.alphabet).toStrictEqual(new Set(['0']));

			FA.setInitialState(State.S2);
			expect(FA.initialState).toBe(State.S2);

			FA.addFinalStateItem(State.S2);
			FA.addFinalStateItem(State.S0);
			expect(FA.finalStates).toStrictEqual(new Set([State.S2, State.S0]));

			FA.addTransitionItem(State.S0, '0', State.S0);
			expect(FA.transitionMap).toStrictEqual(new Map([[State.S0, new Map([['0', State.S0]])]]));
		});

		test('addTransitionItem method should trow errors for the wrong parameters', () => {
			FA.addStateItem(State.S0);
			FA.addStateItem(State.S1);
			FA.addAlphabetItem('0');
			FA.addFinalStateItem(State.S2);
			FA.addFinalStateItem(State.S0);

			expect(() => FA.addTransitionItem(State.S2, '0', State.S0))
				.toThrow(`There is no '${State.S2}' specified in states`);
			expect(() => FA.addTransitionItem(State.S0, '1', State.S0))
				.toThrow(`There is no '1' specified in alphabet`);
			expect(() => FA.addTransitionItem(State.S0, '0', State.S1))
				.toThrow(`There is no '${State.S1}' specified in final states`);
		});
	});

	describe('Tests for moduloThreeFSM', () => {
		test('Should return modulo 3 for a valid binary integer string', () => {
			expect(moduloThreeFSM('1101')).toBe(State.S1);
			expect(moduloThreeFSM('1110')).toBe(State.S2);
			expect(moduloThreeFSM('1111')).toBe(State.S0);
		});

		test('Should throw an error if received invalid parameter', () => {
			expect(() => moduloThreeFSM(42 as unknown as string))
				.toThrow('You should provide a valid binary integer string');
		});

		test('Should throw an error if string contains non-binary value', () => {
			expect(() => moduloThreeFSM('1104'))
				.toThrow(`There is no '4' specified in alphabet`);
		});
	});
});
