import sortTasksArray from './redux-tasks-sort'

describe('redux sort tasks', () => {
  it('should sort important before neither', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: false,
        quadrantValue: 2
      }
    ]
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(2);
  });
  it('should sort urgent before neither', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: false,
        urgent: true,
        quadrantValue: 3
      }
    ]
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(3);
  });
  it('should sort both before neither', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 1
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(1);
  });

  it('should sort important before urgent', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: true,
        quadrantValue: 3
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: false,
        quadrantValue: 2
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(2);
  });

  it('should sort both before important', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: true,
        urgent: false,
        quadrantValue: 2
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 1
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(1);
  });

  it('should sort both before urgent', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: true,
        quadrantValue: 3
      },
      {
        _id: '59de2b4faadb940388fae1b3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 1
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(1);
  });

  it('should not sort tasks if are equal', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: true,
        urgent: true,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fab3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 4
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(4);
  });
});

describe('3 tasks sorter', () => {
  it('sort three or more tasks', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fab3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: false,
        quadrantValue: 2
      },
      {
        _id: '59de2b4faadb940388fac2',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dcch4',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 1
      }
    ];
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(2);
    expect(sortTasksArray(testTaskArray)[1].quadrantValue).toBe(1);
    expect(sortTasksArray(testTaskArray)[2].quadrantValue).toBe(4);
  });

  it('should sort 2nd round of three tasks', () => {
    const testTaskArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      },
      {
        _id: '59de2b4faadb940388fab3',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: false,
        quadrantValue: 2
      },
      {
        _id: '59de2b4faadb940388fac2',
        taskName: 'adding yet another',
        userId: {
          _id: '59dcea3e38e506205b4dcch4',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: '',
        important: true,
        urgent: true,
        quadrantValue: 1
      }
    ];
    console.log('look here ----->', sortTasksArray(testTaskArray))
    expect(sortTasksArray(testTaskArray)[0].quadrantValue).toBe(1);
    expect(sortTasksArray(testTaskArray)[1].quadrantValue).toBe(2);
    expect(sortTasksArray(testTaskArray)[2].quadrantValue).toBe(4);
  });

  it('return empty array on 0 length array', () => {
    expect(Array.isArray(sortTasksArray([]))).toBe(true);
  });

  it('should sort n tasks > 3', () => {

  });

  it.only('one item array should return itself', () => {
    const testArray = [
      {
        _id: '59de2794aadb940388fae1a9',
        taskName: 'fix weird issue with tasks moving around',
        userId: {
          _id: '59dcea3e38e506205b4dccf5',
          displayName: 'M. Scott Cameron',
          googleId: '116659764207939386314',
          accessToken: 'ya29.GlzhBKUemNqsd9Bt_9N6_0fPmMXHn9e4md-tg-nR4c-5D3XzQ8Pr5qNGveRaPhk9gy_3I07LvVi07IIinv4G89em8gzqLcpf9R__8FYpYP8hPRaoiu8uLbMGxLcZbg',
          __v: 0,
          mission: 'Get this task component to work!',
          roles: []
        },
        deadline: 'today',
        important: false,
        urgent: false,
        quadrantValue: 4
      }
    ]
    expect(sortTasksArray(testArray)[0].quadrantValue).toBe(testArray[0].quadrantValue);
  }); 
});