import { expect } from "chai"
import reducer from "../src/reducer"

describe("reducer test", () => {
  describe("Add Teacher action", () => {
    it("should add a teacher", () => {

      const state = reducer({ teachers: [], students: [] }, { type: 'ADD_TEACHER', payload: { id: 1 } });
      expect(state.teachers[0].id).to.equal(1);
    })
  })
});