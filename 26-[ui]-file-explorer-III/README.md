# File Explorer

`Approx time - 15 mins`

This is an extension/modification to previous Nested flatlist question. The main idea is, you need to modify nested flatlist so that there's only one `ul` and all `li` should be coming under that.

**Nested flatlist version**

If you inspect the dom in nested flatlist it will be like

```html
<ul>
  <li></li>
  <li>
    <ul>
      <li></li>
    </ul>
  </li>
</ul>
```

This happens because we have `ul` for every sub-list. I mean if it is a directory then we do

```html
<ul>
  /* directory */
  <li></li>
  <li></li>
</ul>
```

So when a new directory comes in between, the above becomes nested like this

```html
<ul>
  /* directory */
  <li></li>
  <li></li>

  <ul>
    /*nested directory -> again starts with ul*/
    <li></li>
  </ul>
</ul>
```

So to summarize, every nested directory starts with ul because of which we get the nested structure. Notice in File Explorer I question, we are not using level to style at all. That is because `ul` at every level, by default creates that nested structure.

**Nested flatlist version**

In this question, FlatList III, we will modify the above FlatList I, II and remove intermediate `ul` to have a flat structure. Using level, we can give the padding left.

So this

```html
<ul>
  /* directory */
  <li></li>
  <li></li>

  <ul>
    /*nested directory -> again starts with ul*/
    <li></li>
  </ul>
</ul>
```

becomes

```html
/*-> We will add main ul outside as a container to main list*/
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```
