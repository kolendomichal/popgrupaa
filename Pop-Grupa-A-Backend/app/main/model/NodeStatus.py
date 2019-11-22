from enum import Enum

class NodeStatus(Enum):
    CREATED = 1
    SUBMITTED = 2
    ACTIVE = 3
    INACTIVE = 4
    DISABLED = 5

    def __str__(self):
        return self.name