# Thymleaf
1. Natural templates

<table>
  <thead>
    <tr>
      <th th:text="#{msgs.headers.name}">Name</th>
      <th th:text="#{msgs.headers.price}">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr th:each="prod: ${allProducts}">
      <td th:text="${prod.name}">Oranges</td>
      <td th:text="${#numbers.formatDecimal(prod.price, 1, 2)}">0.99</td>
    </tr>
  </tbody>
</table>

2. Standard Expression syntax

${...} : Variable expressions.
*{...} : Selection expressions.
#{...} : Message (i18n) expressions.
@{...} : Link (URL) expressions.
~{...} : Fragment expressions.
-------------------------------------
2.1 Variable expressions
	Variable expressions are OGNL expressions –or Spring EL if you’re integrating Thymeleaf with Spring– executed on the context variables — also called model attributes in Spring jargon. They look like this:
<script type="text/javascript">	
	<span th:text="${book.author.name}">
	((Book)context.getVariable("book")).getAuthor().getName()
	<li th:each="book : ${books}">
</script>
2.2 Selection expressions
	Selection expressions are just like variable expressions, except they will be executed on a previously selected object instead of the whole context variables map. They look like this:
---- Select book.title
<div th:object="${book}">
\\final Book selection = (Book) context.getVariable("book");
  ...
  <span th:text="*{title}">...</span>
  \\output(selection.getTitle());
  ...
</div>
2.3 Message (i18n) expressions
	Message expressions (often called text externalization, internationalization or i18n) allows us to retrieve locale-specific messages from external sources (.properties files), referencing them by a key and (optionally) applying a set of parameters.
<table>
  ...
  <th th:text="#{header.address.city}">...</th>
  <th th:text="#{header.address.country}">...</th>
  ...
</table>
	* Note you can use variable expressions inside message expressions if you want the message key to be determined by the value of a context variable, or you want to specify variables as parameters:
#{ ${config.adminWelcomeKey}(${session.user.name}) }
2.4 Link (URL) expressions
	<a th:href="@{/order/list}">...</a>
	EQ:
	<a href="/myapp/order/list">...</a>
---
* URLs can also take parameters:
	<a th:href="@{/order/details(id=${orderId},type=${orderType})}">...</a>
	EQ:
	<a href="/myapp/order/details?id=23&amp;type=online">...</a>
* Link expressions can be relative:
	<a th:href="@{../documents/report}">...</a>
* Also server-relative (again, no application context to be prefixed):
	<a th:href="@{~/contents/main}">...</a>
* And protocol-relative (just like absolute URLs, but browser will use the same HTTP or HTTPS protocol used in the page being displayed):
	<a th:href="@{//static.mycompany.com/res/initial}">...</a>
* And of course, Link expressions can be absolute:
	<a th:href="@{http://www.mycompany.com/main}">...</a>
2.5 Fragment expressions
	Fragment expressions are an easy way to represent fragments of markup and move them around templates. Thanks to these expressions, fragments can be replicated, passed to other templates are arguments, and so on.
-------	
	* The most common use is for fragment insertion using th:insert or th:replace:
	// ~ là root folder
	<div th:insert="~{commons :: main}">...</div>
	* But they can be used anywhere, just as any other variable:
	<div th:with="frag=~{footer :: #main/text()}">
	  <p th:insert="${frag}">
	</div>
	* Ex2:
	<nav th:fragment="menu" id="page-nav" class="col-12 col-md-3">
		....
	</nav>
	// Insert
	<th:block th:insert="~{fragments/menu:: menu}">Menu</th:block>
	* Header With func
	<th:block th:fragment="headerFunc(link, screenCode)">
		....
	</th:block>
	// Insert : lấy fragment tại thư mục fragments>header.html>fragment:headerFunc
	<th:block th:insert="fragments/header::headerFunc('/user/register','label.user_registration')">Header</th:block>
	* Include footer
	<div id="copy-section">&copy; 2011 The Good Thymes Virtual Grocery</div>
	<div th:include="footer :: #copy-section"></div>
	* Include vs Replace : Replace sẽ thay thế element = element chứa attr replace
	<footer th:fragment="copy">&copy; 2011 The Good Thymes Virtual Grocery</footer>
	// include - replace
  <div th:include="footer :: copy"></div>
  <div th:replace="footer :: copy"></div>
  // Result
	<div>&copy; 2011 The Good Thymes Virtual Grocery</div>
  <footer>&copy; 2011 The Good Thymes Virtual Grocery</footer>
  *  Parameterizable fragment signatures
  <div th:fragment="frag (onevar,twovar)">
    <p th:text="${onevar} + ' - ' + ${twovar}">...</p>
	</div>
	// Pass parameters
	<div th:include="::frag (${value1},${value2})">...</div>
	<div th:include="::frag (onevar=${value1},twovar=${value2})">...</div>
  .
.
..
.
.
.
2.6 Literals and operations
Literals -  Chữ:
	Text literals: 'one text', 'Another one!',…
	Number literals: 0, 34, 3.0, 12.3,…
	Boolean literals: true, false
	Null literal: null
	Literal tokens: one, sometext, main,…
Text operations:
	String concatenation: +
	Literal substitutions: |The name is ${name}|
Arithmetic operations:
	Binary operators: +, -, *, /, %
	Minus sign (unary operator): -
Boolean operations:
	Binary operators: and, or
	Boolean negation (unary operator): !, not
Comparisons and equality:
	Comparators: >, <, >=, <= (gt, lt, ge, le)
	Equality operators: ==, != (eq, ne)
Conditional operators:
	If-then: (if) ? (then)
	If-then-else: (if) ? (then) : (else)
	Default: (value) ?: (defaultvalue)
2.7 Expression preprocessing
	#{selection.__${sel.code}__}





.
.
.
.
.
.
.

