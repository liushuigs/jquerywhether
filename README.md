jquerywhether
=============
$.whether是一个Deferred对象管理器，接受一至多个Deferred对象参数。只要有一个Deferred参数成功时，$.whether就会执行成功函数，并将该成功Deferred的返回值作为参数带入；当所有Deferred参数都失败时，$.whether才会执行失败函数。
