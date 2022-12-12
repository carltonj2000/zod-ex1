import { describe, expect, it } from "vitest";
import { z } from "zod";

const pipe = z
  .string()
  .transform((val) => val.length)
  .pipe(z.number().min(10))
  .pipe(z.number().max(20));

const result = pipe.parse("hello world");

describe("Pipe", () => {
  it("REPL", () => {
    expect(result).toMatchInlineSnapshot("11");
  });
});

const schema = z.coerce.string();

const cResult = schema.parse(123);

describe("Coerce", () => {
  it("REPL", () => {
    expect(cResult).toMatchInlineSnapshot('"123"');
  });
});

const catachableSchema = z.number().catch(123);

const catResult = catachableSchema.parse("a123");

describe("Catchable", () => {
  it("REPL", () => {
    expect(catResult).toMatchInlineSnapshot("123");
  });
});

const dateTimeSchema = z.string().datetime();

const dtResult = dateTimeSchema.parse("2022-12-12T00:00:00Z");

describe("DateTime", () => {
  it("REPL", () => {
    expect(dtResult).toMatchInlineSnapshot('"2022-12-12T00:00:00Z"');
  });
});
