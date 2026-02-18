export abstract class DomainError extends Error {
  public readonly code: string

  protected constructor(code: string, message: string) {
    super(message)
    this.code = code
    this.name = this.constructor.name
  }
}