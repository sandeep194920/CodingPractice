`Approx time needed - 20 minutes`

## 📝 Progress bar (React)

Implement a progress bar component which shows the completion progress by filling the bar proportionately to the progress (a number between 0-100, inclusive).

---

### Things to learn

**Progressbar foreground div**

- Add `role="progressbar"` to `div` of **progressbar foreground**. Remember, whenever you use div, always try to use role on that to make it accessible.

- Add `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to `div` of **progressbar foreground**.

```tsx
 <div className="progressbar__bg">
      {/* Note - aria roles must not be on background, but must be on foreground */}
      <div
        aria-valuemax={100}
        aria-valuenow={progressBarWidth}
        aria-valuemin={0}
        role="progressbar"
        style={{ width: `${progressBarWidth}%` }}
        className="progressbar__fg"
      >
        {progressBarWidth}%
      </div>
</div>
```
