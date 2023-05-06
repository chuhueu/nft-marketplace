export default class StringUtils {

  static isBlank(value: String) {
    return (!value || value == undefined || value == "" || value.length == 0);
  }

  static isNonBlank(value: string) {
    return !StringUtils.isBlank(value);
  }
}