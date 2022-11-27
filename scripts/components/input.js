export function input({
  label,
  pattern,
  id,
  name,
  placeholder = "",
  type,
  required = false,
  value = false,
  icon,
  error,
}) {
  return `
  <div class="input">
    ${
      label
        ? `<label for="${id}" class="content-xs overline">${label}</label>`
        : ""
    }

    <div class="input__container">
      <input
        type="${type ? type : "text"}"
        ${ pattern
        ? `pattern= "${pattern}" `: ""
        }
        placeholder="${placeholder}"
        class="input__content"
        id="${id}"
        name="${name ? name : id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      />
    </div>
    ${error ? `<span class="input__error-message">${error}</span>` : ""}
  </div>
  `;
}
