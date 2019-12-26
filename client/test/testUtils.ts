import { ShallowWrapper, ReactWrapper } from 'enzyme';

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param val - Value of data-tet attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (
  wrapper: ShallowWrapper,
  val: string
): ShallowWrapper => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Return node(s) with the given data-test attribute.
 * @param {ReactWrapper} wrapper - Enzyme shallow wrapper.
 * @param val - Value of data-tet attribute for search.
 * @returns {ReactWrapper}
 */
export const findByTestAttrReactWrapper = (
  wrapper: ReactWrapper,
  val: string
): ReactWrapper => {
  return wrapper.find(`[data-test="${val}"]`);
};
