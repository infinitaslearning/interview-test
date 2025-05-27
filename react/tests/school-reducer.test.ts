import { SchoolActionKind, schoolReducer } from "../src/school-context";

describe("School reducer test", () => {
  describe("Add Teacher action", () => {
    it("should add a teacher", () => {
      const state = schoolReducer(
        { teachers: [], students: [] },
        {
          type: SchoolActionKind.ADD_TEACHER,
          payload: { id: "1", name: "First Teacher", students: [] },
        }
      );
      expect(state.teachers[0].id).to.equal("1");
    });
  });
});
