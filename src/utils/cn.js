/** Une clases condicionalmente (filtra falsy). Mini alternativa a clsx. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
