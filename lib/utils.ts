/**
 * Checks if a list of HTML classes can be applied to an element or not.
 * For instance, if a class list is empty or if it's only element is an empty string,
 * it will throw a DOM error.
 *
 * @param classes
 */
export function isClassListEmpty( classes?:string[] ) : boolean {
  // If classes is undefined
  if (!classes)
    return true;
  
  // If the classes array has no items
  if (classes.length < 1)
    return true;
  
  // If the first item is undefined
  if (!classes[0])
    return true;
  
  // If the first item is an empty string
  return classes[0].length < 1;
}